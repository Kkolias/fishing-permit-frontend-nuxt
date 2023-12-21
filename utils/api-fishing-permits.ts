import type { IFishingPermit } from "~/interfaces/fishing-permit.interface";

const FISHING_PERMITS_ENDPOINTS = {
    GET_ALL: '/fishing-permit/get-all',
    GET_BY_ID: '/fishing-permit/get-by-id'
}

export class FishingPermitApi extends ApiUtil {


    async getAllFishingPermits(): Promise<IFishingPermit[]> {
        try {
            const permits = await this.get({ url: FISHING_PERMITS_ENDPOINTS.GET_ALL })
            
            return permits
        } catch (error) {
            console.error(error)
            return []
        }

    }

    async getFishingPermitById(id: string): Promise<IFishingPermit | null> {
        try {
            const permit = await this.get({ url: FISHING_PERMITS_ENDPOINTS.GET_BY_ID, query: { id } })
            
            return permit
        } catch (error) {
            console.error(error)
            return null
        }

    }
}

export default new FishingPermitApi()