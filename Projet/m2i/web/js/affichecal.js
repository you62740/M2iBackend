function afficherCalendrier(idInputDate)
{
    $('#' + idInputDate).datepicker({
        dateFormat: 'dd/mm/yyyy',
        firstDay: 1
    });
}