import { config } from "@/config.js";

export class Debug{
	static writeMessage( message ){
		if( config.debug ){
			console.log( message );
		}
	}
}