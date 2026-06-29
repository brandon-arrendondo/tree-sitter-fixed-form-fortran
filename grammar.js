const FORTRAN = require("tree-sitter-fortran/grammar")

const PREC = Object.assign(FORTRAN.PREC, {})

module.exports = grammar(FORTRAN, {
    name: 'fixed_form_fortran',

    externals: ($, original) => [
        ...original($),
        // Fixed-form Fortran treats any line whose first character is *, C, or c
        // as a comment (column 0). Free-form Fortran only recognises ! comments.
        $.fixed_form_comment,
    ],

    extras: ($, original) => [
        ...original($),
        $.fixed_form_comment,
    ],
})
