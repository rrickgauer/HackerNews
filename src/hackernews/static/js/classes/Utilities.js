
export default class Utilities 
{
    
    /**************************************************
    Enable the scroll button on the current page.
    ***************************************************/
    static enableJumpButton() {
        const className = '.btn-scroll-top';

        $(className).on('click', function() {
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        });
        
        const scrollBtn = $(className);
        
        $(window).on('scroll', function() {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                $(scrollBtn).removeClass('d-none');
            } else {
                $(scrollBtn).addClass('d-none');
            }
        });
    }
}


