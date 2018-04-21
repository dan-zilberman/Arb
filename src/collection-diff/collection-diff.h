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
*param old_values Old array of void pointers.
*param new_values New array of void pointers.
*param equals Function to check equality of two void pointers.
*return Vector of operation_t structs.
*/
vector_t diff(vector_t old_values, vector_t new_values, equals_t equals);
