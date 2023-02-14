import { agregarClienteBD, agregarProductoBD, executeQuery} from "./firebase.js" //--> Importamos las funciones que definimos con firebase
//Declaracion de funciones
const validarVacio = (campo) => { //--> Funcion para validar que los campos del formulario no esten vacios
    if (campo.value != "" && campo.value != null){
        return true
    }else{
        return false
    }
}
const validarCorreo = (campo) =>{ //--> Funcion para validar que el correo contenga los caracteres que conforman un dominio de correo
    if (campo.value.includes('@') && campo.value.includes('.com' || campo.value.includes('.es') || campo.value.includes('.co'))){
        return true
    }else{
        return false
    }
}
const irSeccion = (seccion, add1, add2) =>{ //--> funcion para agregar atributos de estilo
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
//Llamamos a todos nuestros elementos del DOM
clientForm.addEventListener('submit', (e)=>{ //Escuchamos cuando el user envie el formulario de registro de cliente, enviamos a la BD y desocupamos los campos
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
productForm.addEventListener('submit', (e)=>{ //Escuchamos cuando el user envie el formulario de registro de productos, enviamos a la BD y desocupamos todos los campos
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
factuForm.addEventListener('submit', (e)=>{ //NOTA v1.0.0: Para futuras versiones, agregar una pantalla de impresion para conectar con una impresora y que permita visualizar los datos relevantes de la compra
    e.preventDefault()
    executeQuery("Clients", factuForm["id-client-factu"].value, "Cliente")
    executeQuery("Products", factuForm["id-product-factu"].value, "Producto")
    //Simula los datos que va a traer de la factura de compra
})

//Escucha de eventos para cambiar las paginas sin lazy-load
goCliente.addEventListener('click', () => irSeccion(document.getElementById('client-form-area'),document.getElementById('product-form-area'),document.getElementById('factu-form-area')))
goProduct.addEventListener('click', () => irSeccion(document.getElementById('product-form-area'),document.getElementById('client-form-area'),document.getElementById('factu-form-area')))
goFactu.addEventListener('click', () => irSeccion(document.getElementById('factu-form-area'),document.getElementById('client-form-area'),document.getElementById('product-form-area')))