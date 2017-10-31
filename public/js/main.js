$(document).ready(function(){
    $('.delete-recipe').on('click', function(){
        console.log('Deletando');
        var id = $(this).data('id');
        var url = '/delete/' + id;
        if(confirm('Deletar receita?')){
            $.ajax({
                url: url,
                type: 'DELETE',
                success: function(result){
                    console.log('Deletando receita...');
                    window.location.href='/';
                },
                error: function(err){
                    console.log(err);
                }
            });
        }
    });
            
    $('.edit-recipe').on('click', function(){
        console.log("oi");
        $('#edit-form-nome').val($(this).data('nome'));
        $('#edit-form-ingredientes').val($(this).data('ingredientes'));
        $('#edit-form-dir').val($(this).data('dir'));
        $('#edit-form-id').val($(this).data('id'));
    });           
});
       