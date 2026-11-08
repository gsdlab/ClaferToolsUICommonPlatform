/*
 * Submits a form in the background with $.ajax, in place of the jQuery Form plugin's
 * ajaxForm (unmaintained, and it needs APIs that jQuery 4 removed).
 *
 * options.beforeSubmit()                         returns false to cancel the submission
 * options.success(responseText, statusText, jqXHR)
 * options.error(jqXHR, statusText, errorThrown)
 * options.timeout                                in milliseconds, optional
 *
 * Like the plugin, it sends the clicked submit button (its name and value) and an empty
 * string, not an empty file, for a file input without a file.
 */
function ajaxForm(form, options)
{
    $(form).on("submit", function(event) {
        event.preventDefault();

        if (options.beforeSubmit && options.beforeSubmit() === false)
            return;

        var submitter = event.originalEvent && event.originalEvent.submitter;
        var data = new FormData(this, submitter || undefined);

        var emptyFiles = [];
        data.forEach(function(value, name) {
            if (value instanceof File && value.name === "" && value.size === 0)
                emptyFiles.push(name);
        });
        emptyFiles.forEach(function(name) {
            data.set(name, "");
        });

        $.ajax({
            url: this.action,
            method: "POST",
            data: data,
            processData: false,
            contentType: false,
            dataType: "text",
            timeout: options.timeout,
            success: options.success,
            error: options.error
        });
    });
}
