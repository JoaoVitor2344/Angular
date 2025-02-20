import Swal from 'sweetalert2';

export function showLoader() {
  Swal.fire({
    title: 'Carregando...',
    didOpen: () => {
      Swal.showLoading();
    },
  });
}

export function hideLoader() {
  Swal.close();
}
