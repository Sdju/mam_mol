namespace $ {
	
	export class $mol_wire_fiber_temp<
		Host,
		Args extends readonly unknown[],
		Result,
	> extends $mol_wire_fiber< Host, Args, Result > {
		
		static getter<
			Host,
			Args extends readonly unknown[],
			Result,
		>(
			task: ( this : Host , ... args : Args )=> Result,
		): ( host: Host, args: Args )=> $mol_wire_fiber_temp< Host, [ ... Args ], Result > {
			
			return function $mol_wire_fiber_temp_get( host: Host, args: Args ) {
				
				const existen = $mol_wire_auto()?.track_next()
			
				reuse: if( existen ) {
					
					if(!( existen instanceof $mol_wire_fiber_temp )) break reuse
				
					if( existen.host !== host ) break reuse
					if( existen.task !== task ) break reuse
					if( !$mol_compare_deep( existen.args, args ) ) break reuse
					
					return existen
				}
				
				return new $mol_wire_fiber_temp( `${ host?.[ Symbol.toStringTag ] ?? host }.${ task.name }(#)`, task, host, ... args )
			}
			
		}

		complete() {
			this.destructor()
		}
		
	}

}
