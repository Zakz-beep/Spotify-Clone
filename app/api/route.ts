
export async function POST(request:Request) {
    const {email,password} = await request.json();

    return Response.json({
        email1:email,
        password:password
    })
    
}