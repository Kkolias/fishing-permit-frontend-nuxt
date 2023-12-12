import type { IFishingPermit } from "~/interfaces/fishing-permit.interface";

const FISHING_PERMITS_ENDPOINTS = {
    GET_ALL: '/fishing-permit/get-all'
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
}

export default new FishingPermitApi()