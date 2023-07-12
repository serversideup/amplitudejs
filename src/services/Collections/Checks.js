import { config } from "@/config";

export class Checks {
    static collectionExists( index ){
		if( config.collections[ index ] ){
			return true;
		}else{
			return false;
		}
	}

	static collectionChanged( collection ){
		if (config.active_collection != collection) {
			return true;
		} else {
			return false;
		}
	}

	static isCollectionShuffled( collection ){
        if( config.collections[ collection ].shuffle ){
            return true;
        }else{
            return false;
        }
    }
}