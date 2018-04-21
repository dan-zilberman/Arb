#pragma once

#include <stdlib.h>


typedef struct {
  int x_length;
  int y_length;
  int total_length;
  void** items;
} matrix_t;


void matrix_init(matrix_t *m, int x, int y) {
  m->x_length = x;
  m->y_length = y;

  int total_length = x * y;
  m->total_length = total_length;
  m->items = (void**)malloc(sizeof(void*) * total_length);
}


inline int matrix_x_length(matrix_t *m) {
  return m->x_length;
}


inline int matrix_y_length(matrix_t *m) {
  return m->y_length;
}


inline int index_of(matrix_t *m, int x, int y) {
  return (y - 1) * m->x_length + x;
}


inline void matrix_set(matrix_t *m, int x, int y, void *item) {
  int index = index_of(m, x, y);
  m->items[index] = item;
}


inline void *matrix_get(matrix_t *m, int x, int y) {
  int index = index_of(m, x, y);
  return m->items[index];
}


inline void matrix_free_items(matrix_t *m) {
  for (int i = 0; i < matrix_x_length(&m); i++) {
    for (int j = 0; j < matrix_y_length(&m); j++) {
      free(matrix_get(&m, i, j));
    }
  }
}


inline void matrix_free(matrix_t *m) {
  free(m->items);
}
