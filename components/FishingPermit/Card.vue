<template>
  <div class="component-FishingPermitCard">
    <div class="permit-wrapper">
      <div class="info-wrapper">
        <label for="name">Nimi:</label>
        <p id="name">{{ permitFirstName }} {{ permitLastName }}</p>
      </div>
      <div class="info-wrapper">
        <label for="name">Sähköposti:</label>
        <p id="name">{{ permitEmail }}</p>
      </div>
      <div class="info-wrapper">
        <label for="name">Alkamisaika:</label>
        <p id="name">{{ permitStartsAt }}</p>
      </div>
      <div class="info-wrapper">
        <label for="name">Päättymisaika:</label>
        <p id="name">{{ permitEndsAt }}</p>
      </div>
      <div class="info-wrapper">
        <label for="name">Luvan järvi:</label>
        <p id="name">{{ permitLake }}</p>
      </div>

      <div class="info-wrapper">
        <label for="catches">Saaliit:</label>
        <p v-if=!permitCatches.length>Ei lisättyjä saaliita</p>
        <table v-if="permitCatches.length" class="catches-table-wrapper" id="catches">
          <thead>
            <tr>
              <th>
                Laji
              </th>
              <th>
                Paino (Kg)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(catchedFish, key) in permitCatches" :key="key">
              <td>
                <span>{{ catchedFish.specie }}</span>
              </td>
              <td>
                <span> {{ parsedCatchWeight(catchedFish) }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="info-wrapper catches-wrapper">
        <button class="primary add-catch-btn" @click="setIsModalOpen(true)">Lisää saalis</button>
      </div>
      <div class="qr-code-wrapper">
        <canvas class="qr-code" id="canvas"></canvas>
      </div>
    </div>
    <FishingPermitAddCatchModal :permitId="permitId" :modalOpen="modalOpen" @closeModal="setIsModalOpen(false)"
      @updatePermitData="updatePermitData" />
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import type { CatchedFish, IFishingPermit } from '~/interfaces/fishing-permit.interface';
import { LAKES_BY_ID } from '~/constants/lakes-by-id'
import * as QRCode from 'qrcode';
import { toLocaleDateString, toLocaleTimeString } from '~/utils/time'
// import QRCode from 'qrcode';

export default {
  props: {
    permitData: {
      type: Object as PropType<IFishingPermit | null>,
      default: () => ({})
    }
  },
  data: () => ({
    modalOpen: false
  }),
  computed: {
    permitId(): string {
      return this.permitData?._id || ''
    },
    permitFirstName(): string {
      return this.permitData?.firstName || ''
    },
    permitLastName(): string {
      return this.permitData?.lastName || ''
    },
    permitEmail(): string {
      return this.permitData?.email || ''
    },
    permitStartsAt(): string {
      const d = this.permitData?.startsAt || ''
      if (!d?.length) return '--'

      return `${toLocaleDateString(d)} klo ${toLocaleTimeString(d)}`
    },
    permitEndsAt(): string {
      const d = this.permitData?.endsAt || ''
      if (!d?.length) return '--'

      return `${toLocaleDateString(d)} klo ${toLocaleTimeString(d)}`
    },
    permitLake(): string {
      const lakeId = this.permitData?.lakeId || null
      if (!lakeId) return ''
      return LAKES_BY_ID?.[lakeId]
    },

    permitCatches(): CatchedFish[] {
      return this.permitData?.catches || []
    },

    permitLink() {
      const path = window?.location?.href
      // console.log(path)
      return path
    },


  },
  mounted() {
    this.createQrCode()
  },

  methods: {
    createQrCode(): void {
      QRCode.toCanvas(document.getElementById('canvas'), this.permitLink, {
        margin: 1,
        color: {
          light: '#e8e8e8',
          dark: '#1c1c1c'
        },
        width: 400
      }, (error) => {
        if (error) console.error(error)
      })
    },

    parsedCatchWeight(catchedFish: CatchedFish): string {
      const weightInGrams = catchedFish?.weightInGrams || 0

      const weightInKilograms = weightInGrams / 1000
      return weightInKilograms?.toFixed(2);
    },

    setIsModalOpen(value: boolean): void {
      this.modalOpen = value
    },
    updatePermitData(data: IFishingPermit): void {
      this.$emit("updatePermitData", data)
    }

  }
}
</script> 

<style lang="less" scoped>
.component-FishingPermitCard {
  .permit-wrapper {

    border: 2px solid var(--black-2);
    border-radius: 10px;
    padding: 24px;
    max-width: 400px;
    margin: auto;

    .info-wrapper {
      margin: 12px 0;

      label {
        font-size: 14px;
        color: var(--white-2);
      }

      p {
        margin: 0;
        font-size: 18px;
      }


      .catches-table-wrapper {
        min-width: 100%;
        border-collapse: separate;
        border-spacing: 0;

        thead {
          tr {
            th {
              text-align: left;

              &:first-child {
                padding-left: 4px;
              }
            }
          }
        }

        tbody {
          tr {
            td {
              padding: 4px;
              &:first-child {
                  padding-left: 4px;
              }
            }
            &:nth-child(odd) {

              td {
                // border: 2px solid var(--black-2);
                background: var(--black-2);
                
                &:first-child {
                  border-radius: 5px 0 0 5px;
                  // border-right: none;
                }

                &:last-child {
                  border-radius: 0 5px 5px 0;
                  // border-left: none;
                }
              }
            }


            // border-radius: 5px 0 0 5px;

          }
        }
      }
    }

    .qr-code-wrapper {
      margin-top: 36px;
    }
  }
}
</style>