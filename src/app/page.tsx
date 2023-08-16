import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'


export default async function Home() {

  const supabase =createServerComponentClient({cookies})
  const {data:posts} =await supabase.from('posts').select('*')

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
   <h1>hola twitter</h1>
   <pre>
    {
      JSON.stringify(posts,null,2)
    }
   </pre>


    </main>
  )
}



//import {createServerComponentClient} from '@supabase/auth-helpers-nextjs' estamos creando un cliente de supabase en un componente de servidor
//import {cookies} from 'next/headers' este es un componente que se esta creando desde el servidor,y nos permite acceder a las cokkies
//sirve para que supabase  sepa si esta logeado, si tiene seccion o no tiene seccion, etc
// const {data:posts} aqui data la renombramos a posts  =await supabase.from('posts').select('*') // ese select * es por que se seleccionan todos los campos
