'use server'

import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'

export const addPost = async (formData: FormData) => {
  const content = formData.get('content')

  if (content === null) return

  //creamos el cleinte se supabase
  const supabase = createServerActionClient({ cookies })
  // revisar si el usuario realmente está autentificado
  const { data: { user } } = await supabase.auth.getUser() //recuperamos la session
  if (user === null) return

  await supabase.from('posts').insert({ content, user_id: user.id }) //los insert de los post, para que sepa la relacion, tenemos que pasarle el user.id

  revalidatePath(`/?content=${content.toString()}`)
}


//({ content, user_id: user.id }) si el user_id que crea el post es igual que el autentificado, si lo podra agregar
//import { revalidatePath } from 'next/cache' es similar al refresh, una vezz que revalidamos la ruta, volvera ha ahcer la petision, sin estados ni nada 
//nos ahorramos un useEffect o useState, le digo revalida la ruta, ejecuta todo el codigo necesario y renderiza nuevamente el componente
//y en el cleinte, solo aquello que tiene un cambio me lo reconsilias, lo antiguo, con lo nuevo.