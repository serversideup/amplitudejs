import { config } from "@/config";

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
				if( config.active_collection == collection && 
					config.collections[ collectionKey ].active_index != audioIndex ){
						return true;
				}else{
					return false;
				}
			}
		}
	}
}