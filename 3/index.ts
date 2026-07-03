async function login(email:string, password:string){
    const user = await repository.findByEmail(email)
    if(!user){
        throw new Error("usuario no encontrado")
    }

    return user
}