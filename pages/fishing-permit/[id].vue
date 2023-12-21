<template>
    <div class="page-fishing-permit-card">
        <LoadingIndicator v-if="loading" />
        <FishingPermitCard v-if="!loading" :permitData="permitData" />
    </div>
</template>

<script lang="ts">
import type { IFishingPermit } from '~/interfaces/fishing-permit.interface';
import fishingPermitApit from '~/utils/api-fishing-permits'

interface FishingPermitByIdPageData {
    permitData: IFishingPermit | null,
    loading: boolean
}
export default {
    data: (): FishingPermitByIdPageData => ({
        permitData: null,
        loading: true,
    }),
    computed: {
        id(): string {
            const id = this.$route?.params?.id as string || ''
            return id
        }
    },
    mounted() {
        this.fetchPermitById()
    },
    methods: {
        async fetchPermitById() {
            this.setLoading(true)
            const permit = await fishingPermitApit.getFishingPermitById(this.id)
            this.setPermitData(permit)
            this.setLoading(false)
        },
        setPermitData(data: IFishingPermit | null): void {
            this.permitData = data
        },
        setLoading(value: boolean): void {
            this.loading = value
        },
    }
}
</script>