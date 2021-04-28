# Hola mundo con TypeScript y Netlify functions

Netlify te permite desplegar funciones sin servidor en AWS, las famosas **AWS’s serverless Lambda functions** sin necesidad de tener una cuenta en Amazon, de forma que podemos tener un proyecto completo en Netlify, no sólo las funciones como Backend, si no también el Frontend.

Las funciones Lambda de AWS abren un mundo de posibilidades, ya que podemos correr código de servidor sin tener un servidor dedicado y además nuestro código será escalable dentro de la arquitectura de AWS.

Por defecto, todas la funciones que despleguemos en Netlify tendrán las siguientes características:
- Se alojarán en us-east-1 AWS Lambda region
- Contarán con 1024MB de memoria
- Un límite de 10 segundos de ejecución para funciones síncronas
- Y 15 minutos de límite de ejecución para funciones en segundo plano [background functions](https://docs.netlify.com/functions/background-functions/) que explicaré en otro post

## 1. Iniciando proyecto de TypeScript

Para iniciar un proyecto de TypeScript ve a mi [artículo](https://fjmduran.com/blog/node_ts) donde lo explico, es muy rápido y fácil

## 2. Añadirlo a GitHub

Crea en la raíz del proyecto el fichero .gitignore, para añadir todo lo que no queramos que se sigue en Git. En nuestro caso no queremos que se siga la carpeta *node_modules*

A continuación:

1. Creamos nuestro proyecto en GitHub.
2. Inicializamos un proyecto de git con: `git init`
3. Añadimos al repositorio todos los archivos excepto los que están en el fichero .gitignore con: `git add .`
4. Añadimos el repositorio remoto con: `git remote add origin <nombre-de-tu-repositorio>`
5. Hacemos el primer commit con: `git commit -m "first commit"`
6. Cambiamos a la rama *main* con: `git branch -M main`
7. Subimos los fichero a nuestro repositorio remoto con: `git push -u origin main`

Si quieres más información acerca de git puedes echarle un vistazo a [este artículo](https://fjmduran.com/blog/git_github)

## 3. Crear cuenta gratis en Netlify

Para crearnos una cuenta gratuita vamos a esta [web](https://app.netlify.com/) y elegimos la forma de login que más nos guste, en mi caso elegí hacerlo con GitHub.

## 4. Crear proyecto en Netlify

En la pestaña de *Sites*, pulsar sobre el botón que pone *New site from Git* y elegir el repositorio quecreamos en el punto 2.

Esta acción publicará automáticamente lo que tengamos en nuestro repositorio, ya que por defecto está activado el *continuous deployment and continuous integration (CI/CD)*

## 5. Preparando nuestro entorno para escribir las funciones

Antes de crear nuestra función de hola mundo, tenemos que crear una carpeta llamada *netlify* y dentro otra llamada *functions* y ahí es donde crearemos nuestra funciones que después desplegaremos en Netlify. Esa ruta de carpeta es en la que Netlify buscará por defecto las funciones para transpilarlar a JavaScript y desplegarlas.

Si quisieras que tus funciones estuvieran en otra ubicación lo puedes configurar haciendo uso de un fichero llamado `netlify.toml` en donde le puedes especificar en la sección `[functions]` la propiedad de `directory` y ahí escribir tu ruta deseada, resumiendo, si quisiera desplegar tus funciones en una carpeta llamada `mis_funciones` tu fichero tendría una sección con el siguiente aspecto:
```
[functions]
  directory = "mis_funciones"
```

A continuación, instalaremos los tipos para TypeScript de las funciones de Netlify, para ello `npm install @netlify/functions`

Es recomendable que tengas activadas las propiedades `esModuleInterop` y `isolatedModules` de tu fichero de configuración de TypeScript `tsconfig.json`

## 6. Crear función en TypeScript

Crearemos en el directorio que deseemos tener nuestras funciones, recuerda que en el punto anterior creamos una carpeta `netlify` y dentro otra `functions` un fichero typescript llamado `hola.ts` y en su interior escribiremos nuestra función de hola mundo. El fichero `hola.ts` quedará:

```typescript
import { Handler } from "@netlify/functions";

const handler: Handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hola mundo" }),
  };
};

export { handler };
```


## 7. Desplegar en Netlify

Para desplegar en Netlify tan fácil como subir los cambios a nuestro repositorio remoto, para ello:
1. `git add .`
2. `git commit -m "hola mundo"`
3. `git push`

Si nos vamos a nuestra cuenta de Netlify y entramos al sitio que creamos en el punto 4 veremos los distintos despliegues en la zona que rodeo en amarillo:

![resumen de sitio en Netlify](https://firebasestorage.googleapis.com/v0/b/siguientenivel150116.appspot.com/o/Blog%2Fnetlify-function-typescript%2Fpanel-sitio.webp?alt=media&token=de9a2f1a-08c0-4982-9707-ca3ab9376a85 "Imagen del sitio en Netlify")

Si pulsamos en la pestaña de *Functions* veremos nuestra función desplegada y pulsando sobre ella accederemos a sus características como son el endpoint y el panel de log

![resumen de función en Netlify](https://firebasestorage.googleapis.com/v0/b/siguientenivel150116.appspot.com/o/Blog%2Fnetlify-function-typescript%2Fpanel-function.webp?alt=media&token=70bf49d4-d4c4-4d72-af7f-9dd859c7d8f0 "Imagen de la función en Netlify")

## 8. Probar

Tan fácil como escribir el endpoint en nuestro navegador y nos devolverá el `Hola mundo` que escribimos en el body de las respuesta de la función en el punto 6.

Puedes descargarte el código de mi [github](https://github.com/fjmduran/netlify-functions-hello-worl)

Saludos,
