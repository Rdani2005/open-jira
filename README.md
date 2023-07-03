# NextJS Open-Jira app

Open Jira es una aplicación web desarrollada con Next.js que permite gestionar tareas y proyectos utilizando la metodología de seguimiento de problemas de Jira. La aplicación utiliza una base de datos MongoDB y se puede ejecutar fácilmente utilizando Docker Compose.

## Requisitos previos

Antes de ejecutar Open Jira, asegúrate de tener instalados los siguientes componentes:

-   **[Docker](https://docs.docker.com/)**

-   **[Docker Compose](https://docs.docker.com/compose/)**

## Configuración

Sigue los pasos a continuación para configurar y ejecutar Open Jira:

1. **Clonar repositorio**: Clona este repositorio en tu máquina local:

```powershell
git clone https://github.com/rdani2005/open-jira.git
```

2. **Ingresa al repositorio**: Navega al directorio del proyecto:

```powershell
cd open-jira
```

3. **Variables de Entorno**: Crea un archivo de variables de entorno .env basado en el archivo de ejemplo .env.example. Puedes hacerlo ejecutando el siguiente comando:

```powershell
cp .env.example .env
```

4. **Actualizar Variables de Entorno**: Abre el archivo .env y actualiza las variables de entorno según tus preferencias. Asegúrate de proporcionar valores válidos para las variables requeridas.

5. **Ejecutar app**: Ejecuta el siguiente comando para construir las imágenes de Docker y levantar los contenedores:

```powershell
docker-compose up -d
```

6. **Accede tranquilamente**: Una vez que los contenedores se hayan iniciado correctamente, podrás acceder a la aplicación Open Jira en tu navegador web en http://localhost:3000.

## Uso

Open Jira proporciona una interfaz intuitiva para gestionar tareas y proyectos. Puedes crear, editar y eliminar tareas, asignarlas a usuarios, establecer prioridades y mucho más. Explora las diferentes funcionalidades de la aplicación para aprovechar al máximo su potencial.

## Contribución

Si deseas contribuir a Open Jira, sigue estos pasos:

1. Haz un fork de este repositorio.
2. Crea una rama para tu nueva función o correción de errores:

```powershell
git checkout -b nueva-funcion
```

3. Realiza los cambios necesarios y sus commits:

```powershell
git commit -am "Agregada nueva función"
```

4. Envía tus cambios al repositorio remoto:

```powershell
git push origin nueva-funcion
```

5. Abre una solicitud de extracción en GitHub y describe tus cambios en detalle.
   Estaremos encantados de revisar tu contribución y fusionarla si cumple con los estándares de calidad del proyecto.

## Problemas

Si encuentras algún problema o tienes alguna pregunta sobre Open Jira, no dudes en abrir un [issue](https://github.com/rdani2005/open-jira/issues) en el repositorio de GitHub. Haremos todo lo posible para ayudarte.

## Licencia

Open Jira se distribuye bajo la licencia MIT. Consulta el archivo [LICENSE](https://github.com/rdani2005/open-jira/blob/main/LICENSE) para obtener más información.
