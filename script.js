import { agregarClienteBD, agregarProductoBD, executeQuery} from "./firebase.js"
// Definicion de clases
class Ventas {
    constructor(id_fact) {
        this.id_fact = id_fact
    }
    calcDate() {
        let date = new Date()
        return date.getDate()
    }
}
//Declaracion de funciones
const validarVacio = (campo) => {
    if (campo.value != "" && campo.value != null){
        return true
    }else{
        return false
    }
}
const validarCorreo = (campo) =>{
    if (campo.value.includes('@') && campo.value.includes('.com' || campo.value.includes('.es') || campo.value.includes('.co'))){
        return true
    }else{
        return false
    }
}
const irSeccion = (seccion, add1, add2) =>{
    seccion.classList.remove('invisible')
    add1.classList.add('invisible')
    add2.classList.add('invisible')
}
//DOM
const clientForm = document.getElementById('client-form')
const productForm = document.getElementById('product-form')
const factuForm = document.getElementById('factu-form')
const goCliente = document.getElementById('link-client')
const goProduct = document.getElementById('link-product')
const goFactu = document.getElementById('link-factu')
clientForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    if(validarVacio(clientForm['id-cliente']) && validarVacio(clientForm['nom-cliente']) && validarVacio(clientForm['tel-cliente']) && validarVacio(clientForm['correo-cliente'])){
        if(validarCorreo(clientForm['correo-cliente'])){
            agregarClienteBD(clientForm['id-cliente'].value,clientForm['nom-cliente'].value, clientForm['tel-cliente'].value, clientForm['correo-cliente'].value)
            clientForm["id-cliente"].value = ""
            clientForm["nom-cliente"].value = ""
            clientForm["tel-cliente"].value = ""
            clientForm["correo-cliente"].value = ""
        }else{
            console.log('Esto no es un correo');
        }
    }else{
        console.log("Campos vacios");
    }
})
productForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    if(validarVacio(productForm['id-product']) && validarVacio(productForm['nom-product']) && validarVacio(productForm['price-product']) && validarVacio(productForm['cant-product'])){
        agregarProductoBD(productForm['id-product'].value, productForm['nom-product'].value, productForm['price-product'].value, parseInt(productForm['cant-product'].value))
        productForm["id-product"].value = ""
        productForm["nom-product"].value = ""
        productForm["price-product"].value = ""
        productForm["cant-product"].value = ""
    }else{
        console.log("Campos vacios");
    }  
})
factuForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    executeQuery("Clients", factuForm["id-client-factu"].value)
    executeQuery("Products", factuForm["id-product-factu"].value)
})
goCliente.addEventListener('click', () => irSeccion(document.getElementById('client-form-area'),document.getElementById('product-form-area'),document.getElementById('factu-form-area')))
goProduct.addEventListener('click', () => irSeccion(document.getElementById('product-form-area'),document.getElementById('client-form-area'),document.getElementById('factu-form-area')))
goFactu.addEventListener('click', () => irSeccion(document.getElementById('factu-form-area'),document.getElementById('client-form-area'),document.getElementById('product-form-area')))