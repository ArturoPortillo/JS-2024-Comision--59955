function tutorial(){

    Swal.fire({

        customClass: {
            container: '...',
            popup: 'swal2pop',
            header: '...',
            title: 'swal2-title',
            closeButton: '...',
            icon: '...',
            image: '...',
            htmlContainer: '...',
            input: '...',
            inputLabel: '...',
            validationMessage: '...',
            actions: '...',
            confirmButton: 'swalconfirm',
            denyButton: '...',
            cancelButton: '...',
            loader: '...',
            footer: '....',
            timerProgressBar: '....',
        },
        
        title: "Abre el candado para desbloquear el plano.",
        imageUrl: "/close.png",
        position: "bottom-end",
        height: 4,
        toast: true
      }).then(()=>{

        return Swal.fire({

            customClass: {
                container: '...',
                popup: 'swal2pop',
                header: '...',
                title: 'swal2-title',
                closeButton: '...',
                icon: '...',
                image: '...',
                htmlContainer: '...',
                input: '...',
                inputLabel: '...',
                validationMessage: '...',
                actions: '...',
                confirmButton: 'swalconfirm',
                denyButton: '...',
                cancelButton: '...',
                loader: '...',
                footer: '....',
                timerProgressBar: '....',
            },
            
            title: "Puedo seguir?",
            imageUrl: "/close.png",
            position: "bottom-end",
            height: 4,
            toast: true
        });
    }).then(() => {

        return Swal.fire({
            customClass: {
                container: '...',
                popup: 'swal2pop',
                header: '...',
                title: 'swal2-title',
                closeButton: '...',
                icon: '...',
                image: '...',
                htmlContainer: '...',
                input: '...',
                inputLabel: '...',
                validationMessage: '...',
                actions: '...',
                confirmButton: 'swalconfirm',
                denyButton: '...',
                cancelButton: '...',
                loader: '...',
                footer: '....',
                timerProgressBar: '....',
            },
            title: "Y seguir?",
            imageUrl: "/close.png",
            position: "bottom-end",
            height: 4,
            toast: true
        });
    });
}

tutorial()