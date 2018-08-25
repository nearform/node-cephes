
/* Used for removing _malloc and _free in the exports.
 *
 * This will generate a warning but it is worth not having to deal with the
 * extra memory mangement (dead functions and pointers) that are never going
 * to be used.
 */

/* Hack, such that mconf.h is not added dynamically */
/* #include "mconf.h" */

void *__attribute__((noinline)) malloc(unsigned long size) { return (void *)0; }

void __attribute__((noinline)) free(void *ptr) { return; }
