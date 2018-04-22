#include <stdbool.h>
#include <stdlib.h>
#include "vector.h"
#include "matrix.h"
#include "diff.h"


inline int max(int a, int b) {
  return a > b ? a : b;
}


inline void matrix_set_int(matrix_t *matrix, int x, int y, int value) {
  int *pointer = (int*)malloc(sizeof(int));
  *(pointer) = value;
  matrix_set(matrix, x, y, (void*)pointer);
}


inline int matrix_get_int(matrix_t *matrix, int x, int y) {
  return *((int*)matrix_get(matrix, x, y));
}


void lcs_matrix(
  vector_t *old_values,
  vector_t *new_values,
  equals_t equals,
  matrix_t *lcs_lengths;
) {
  int old_index;
  int new_index;
  int old_length = vector_total(old_values);
  int new_length = vector_total(new_values);

  for (old_index = 0; old_index <= old_length; old_index++) {
    for (new_index = 0; new_index <= new_length; new_index++) {
      if (old_index == 0 || new_index == 0) {
        matrix_set_int(lcs_lengths, old_index, new_index, 0);
      }
      else if (equals(
        vector_get(old_values, old_index - 1),
        vector_get(new_values, new_index - 1)
      )) {
        matrix_set_int(
          lcs_lengths,
          old_index,
          new_index,
          matrix_get_int(lcs_lengths, old_index - 1, new_index - 1) + 1
        );
      }
      else {
        lcs_lengths[old_index][new_index] = max(
          matrix_get_int(lcs_lengths, old_index - 1, new_index),
          matrix_get_int(lcs_matrix, old_index, new_index - 1)
        );
      }
    }
  }

  return lcs_lengths;
}


inline void vector_add_operation(vector_t *v, operation_t operation) {
  operation_t *pointer = (operation_t*)malloc(sizeof(operation));
  *(pointer) = operation;
  vector_add(v, (void*)pointer);
}


vector_t diff(vector_t *old_values, vector_t *new_values, equals_t equals) {
  int old_length = vector_total(old_values);
  int new_length = vector_total(new_values);

  matrix_t lcs_lengths;
  matrix_init(&lcs_lengths, old_length + 1, new_length + 1);
  lcs_matrix(old_values, new_values, equals, &lcs_lengths);

  vector_t operations;
  vector_init(&operations, old_length + new_length);
  int old_index = old_length;
  int new_index = new_length;
  while (old_index > 0 && new_index > 0) {
    if (equals(
      vector_get(old_values, old_index - 1),
      vector_get(new_values, new_index - 1)
    )) {
      old_index--;
      new_index--;
    }
    else if (
      matrix_get_int(lcs_lengths, old_index - 1, new_index) >
      matrix_get_int(lcs_lengths, old_index, new_index - 1)
    ) {
      old_index--;
      operation_t operation = {.operation_type = REMOVE, .index = old_index};
      vector_add_operation(operations, operation);
    }
    else {
      new_index--;
      operation_t operation = {.operation_type = ADD, .index = new_index};
      vector_add_operation(operations, operation);
    }
  }

  /* Cleanup */
  matrix_free_items(&lcs_lengths);
  matrix_free(&lcs_lengths);

  return operations;
}
