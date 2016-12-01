namespace $ {
	
	export class $mol_http_resource extends $mol_object {
		
		@ $mol_mem_key()
		static item( uri : string ) {
			return new $mol_http_resource().setup( obj => {
				obj.uri = ()=> uri
			} )
		}
		
		uri() { return '' }
		
		credentials() { return null as {
			login? : string
			password? : string
		} }
		
		@ $mol_mem()
		request( fresh? : boolean ) {
			const request = new $mol_http_request()
			request.method = () => 'Put'
			request.uri = () => this.uri()
			request.credentials = () => this.credentials()
			return request
		}
		
		@ $mol_mem()
		text( next? : string , prev? : string ) {
			return this.request().text( next )
		}
		
		refresh() {
			this.request( !!'fresh' )
		}
		
	}
	
	export class $mol_http_resource_json< Content > extends $mol_http_resource {
		
		@ $mol_mem_key()
		static item< Content >( uri : string ) {
			return new $mol_http_resource_json< Content >().setup( obj => {
				obj.uri = ()=> uri
			} )
		}
		
		json( next? : Content , prev? : Content ) : Content {
			return JSON.parse( this.text( next && JSON.stringify( next , null , '\t' ) ) )
		}
		
	}
	
}
