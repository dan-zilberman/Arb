#pragma once

typedef enum {
    ADD,
    REMOVE
} operation_type_t;


typedef struct {
  operation_type_t operation_type;
  int index;
  void *data;
} operation_t;


typedef bool (*equals_t)(void*, void*);


/*
*param oldValues Old array of void pointers.
*param oldLength Old array length.
*param newValues New array of void pointers.
*param newLength New array length.
*param equals Function to check equality of two void pointers.
*return Vector of operation_t structs.
*/
vector_t diff(vector_t oldValues, vector_t newValues, equals_t equals);
