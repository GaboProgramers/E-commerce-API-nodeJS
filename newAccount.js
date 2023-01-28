function userId() {
    const name = "name"
    let id
    const result = crypto.randomUUID(id)

    return console.log(result + name);
}

userId()