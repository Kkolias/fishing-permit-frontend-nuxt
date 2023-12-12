<template>
    <div class="component-AllFishingPermits">
        <LoadingIndicator v-if="loading"/>
        <div class="permit-list-wrapper">
            <pre>
                {{ fishingPermitList }}
            </pre>
        </div>
    </div>
</template>

<script lang="ts">
import type { IFishingPermit } from '../../interfaces/fishing-permit.interface'
import apiFishingPermits from '../../utils/api-fishing-permits'

interface AllFishingPermitsData {
    fishingPermitList: IFishingPermit[]
    loading: boolean
}

export default {
    data: (): AllFishingPermitsData => ({
        fishingPermitList: [],
        loading: false
    }),
    mounted() {
        this.fetchFishingPermits()
    },
    methods: {
        async fetchFishingPermits() {
            this.setLoading(true)
            const permits = await apiFishingPermits.getAllFishingPermits()
            this.setFishingPermitList(permits)
            this.setLoading(false)
        },
        setFishingPermitList(permits: IFishingPermit[]): void {
            this.fishingPermitList = permits
        },
        setLoading(value: boolean): void {
            this.loading = value
        }
    }
}
</script>

<style lang="less" scoped>
.component-AllFishingPermits {

}
</style>