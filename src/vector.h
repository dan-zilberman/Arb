#pragma once

#include <stdlib.h>


#define DEFAULT_INIT_CAPACITY 10


typedef struct {
  void **items;
  int capacity;
  int total;
} vector_t;


inline void vector_init(vector_t *v, int init_capacity)
{
  v->capacity = init_capacity;
  v->total = 0;
  v->items = malloc(sizeof(void *) * v->capacity);
}


inline void vector_init(vector_t *v)
{
  vector_init(v, DEFAULT_INIT_CAPACITY);
}


void vector_copy(vector_t *v, vector_t *other) {
  int other_total = vector_total(other);
  vector_resize(v, other_total * 2);

  for (int i = 0; i < other_total; i++) {
    vector_set(v, i, vector_get(other, i));
  }
}


inline int vector_total(vector_t *v)
{
  return v->total;
}


void vector_resize(vector_t *v, int capacity)
{
  void **items = realloc(v->items, sizeof(void *) * capacity);
  if (items) {
    v->items = items;
    v->capacity = capacity;
  }
}


inline void vector_add(vector_t *v, void *item)
{
  if (v->capacity == v->total) {
    vector_resize(v, v->capacity * 2);
  }

  v->items[v->total++] = item;
}


inline void vector_set(vector_t *v, int index, void *item)
{
  if (index >= 0 && index < v->total) {
    v->items[index] = item;
  }
}


inline void *vector_get(vector_t *v, int index)
{
  if (index >= 0 && index < v->total) {
    return v->items[index];
  }

  return NULL;
}


void vector_delete(vector_t *v, int index)
{
  if (index < 0 || index >= v->total) {
    return;
  }

  v->items[index] = NULL;

  for (int i = index; i < v->total - 1; i++) {
    v->items[i] = v->items[i + 1];
    v->items[i + 1] = NULL;
  }

  v->total--;

  if (v->total > 0 && v->total == v->capacity / 4) {
    vector_resize(v, v->capacity / 2);
  }
}


inline void vector_free_items(vector_t *v) {
  for (int i = 0; i < vector_total(v); i++) {
    free(vector_get(v, i));
  }
}


inline void vector_free(vector_t *v)
{
  free(v->items);
}
