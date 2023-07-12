import { config } from "@/config";
import { ConfigState } from "@/services/ConfigState";

export class Checks {
    static audioExists( index ){
        if( config.audio[ index ] ){
            return true;
        }else{
            return false;
        }
    }

    static audioChanged( audioIndex, collectionKey = null ){
		if( config.active_collection != collectionKey ){
			return true;
		}else{
			if( config.active_collection == null && collectionKey == null ){
				if( config.active_index != audioIndex ){
					return true;
				}else{
					return false;
				}
			}else{
				let collectionIndex = ConfigState.getCollectionIntegerIndex( collectionKey );

				if( config.active_collection == collectionKey && 
					config.collections[ collectionIndex ].active_index != audioIndex ){
						return true;
				}else{
					return false;
				}
			}
		}
	}
}