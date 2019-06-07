namespace $ {

	export function $mol_data_integer( val : number ) {
		val = $mol_data_number( val )
		if( Math.floor( val ) === val ) return val
		return $mol_fail( new Error( 'Not an integer' ) )
	}
	
}
