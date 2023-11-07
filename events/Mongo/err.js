module.exports =
{
    name: "err",
    execute(err) {
        console.log(`Wystąpił błąd podczas łączenia z Database MongoDB: \n${err}`)
    }
}