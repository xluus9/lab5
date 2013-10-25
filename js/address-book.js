/* address-book.js
    this is where you will add your JavaScript to complete Lab 5
*/


/* sortObjArray()
    sorts an array of objects by a given property name
    the property values are compared using standard 
    operators, so this will work for string, numeric,
    boolean, or date values

    objArray        array of objects to sort
    propName        property name to sort by

    returns undefined (array is sorted in place)
*/
function sortObjArray(objArray, propName) {
    if (!objArray.sort)
        throw new Error('The objArray parameter does not seem to be an array (no sort method)');

    //sort the array supplying a custom compare function
    objArray.sort(function(a,b) {
        
        //note: this compares only one property of the objects
        //see the optional step where you can add support for 
        //a secondary sort key (i.e., sort by another property)
        //if the first property values are equal
        if (a[propName] < b[propName])
            return -1;
        else if (a[propName] === b[propName])
            return 0;
        else
            return 1;
    });
} //sortObjArray()

//Document ready function which renders the address
//It also sorts and rerenders the addresses when
//a sort button is clicked.
$(function(){
    render(Employees.entries);

    //sorts the array of Employees by Last, Title, and 
    //dept
    $('.sort-ui .btn').click(function(){
        var sortBtn = $(this);

        sortObjArray(Employees.entries, sortBtn.attr('data-sortby'));

        render(Employees.entries);

        sortBtn.siblings().removeClass('active');

        sortBtn.addClass('active');
    });

    $('.sort-ui .btn').popover({
        content: function() {
            return 'Click to Resort by ' + $(this).html();
        },
        container: 'body',
        trigger: 'hover',
        placement: 'bottom'
    });
});

//render function that copies the template
//and places it into the address book
function render(entries) {
    var $template = $('.template');
    var $address = $('.address-book');

    $address.hide();
    $address.empty();

    //goes through the array Employees and places
    //it into the right element
    $.each(Employees.entries, function(){
        var $clone = $template.clone();
        $clone.find('.pic').attr({
            src: this.pic,
            alt: 'picture of ' + this.first});
        $clone.find('.first').html(this.first);
        $clone.find('.last').html(this.last);
        $clone.find('.title').html(this.title);
        $clone.find('.dept').html(this.dept);

        $clone.removeClass('template');
        $address.append($clone);
        $address.fadeIn(400);
    });
}
