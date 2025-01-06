import type { PageContext } from 'vike/types'
import type { Data } from './+data'
 
// Overrides the default <title>
export default (pageContext: PageContext<Data>) => pageContext.data.title