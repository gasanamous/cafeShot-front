import Swal from "sweetalert2";

export default async function DeleteDialog({
  title = "Are you sure?",
  text = "This action cannot be undone.",
  confirmButtonText = "Yes, delete it!",
  confirmButtonColor = "#d33",
  cancelButtonColor = "#aaa",
  icon = "warning",
} = {}) {
  const result = await Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonColor,
    cancelButtonColor,
    confirmButtonText,
  });

  return result.isConfirmed;
}
