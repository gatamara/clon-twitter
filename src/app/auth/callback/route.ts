import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from 'next/server'

//esta es una opccion de nextjs para evitar que cachee de forma estatica la ruta
//y que siempre se ejecute en el servidor
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
    const requestUrl = new URL(request.url)  //hay que aceeder a la url //se crea una instancia de url
    const code = requestUrl.searchParams.get('code')  //y luego leer el codigo // acceder al querystring
    //la plataforma web

    if (code !== null) {
        const supabase = createRouteHandlerClient({ cookies })
        //usando el codigo que le hemos pasado por URL, nos devuelve la seccion del usuario

        await supabase.auth.exchangeCodeForSession(code)
    }

    return NextResponse.redirect(requestUrl.origin) // para devolver al usuario a la pagina de origen

}

//return NextResponse.redirect('/') esto es para redireccionarlo al home
//return NextResponse.redirect(requestUrl.origin) // para devolver al usuario a la pagina de origen