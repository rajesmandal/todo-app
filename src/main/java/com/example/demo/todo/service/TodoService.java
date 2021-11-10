package com.example.demo.todo.service;

import com.example.demo.todo.controller.TodoRequestDto;
import com.example.demo.todo.controller.TodoResponseDto;
import com.example.demo.todo.data.TodoEntity;
import com.example.demo.todo.data.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TodoService {
    @Autowired
    TodoRepository todoRepository;


    public int createTodo(TodoRequestDto todoRequestDto){
        TodoEntity todoEntity = new TodoEntity();
        todoEntity.setTitle(todoRequestDto.getTitle());
        todoEntity.setDescription(todoRequestDto.getDescription());
        todoRepository.save(todoEntity);
        int id = todoEntity.getId();
        return id;
    }


    public TodoResponseDto getTodo(Integer id)
    {
        Optional<TodoEntity> todoEntityOptional = todoRepository.findById(id);
        TodoEntity todoEntity = todoEntityOptional.get();
        TodoResponseDto todoResponseDto = new TodoResponseDto();
        todoResponseDto.setId(todoEntity.getId());
        todoResponseDto.setTitle(todoEntity.getTitle());
        todoResponseDto.setDescription(todoEntity.getDescription());
        todoResponseDto.setCreatedAt(todoEntity.getCreatedAt());
        todoResponseDto.setUpdatedAt(todoEntity.getUpdatedAt());
        return todoResponseDto;
    }

    public List<TodoResponseDto> getTodos(){
        List<TodoEntity> todoEntityList = todoRepository.findAll();
        List<TodoResponseDto> todoResponseDtoList = new ArrayList<>();
        for(int i = 0; i < todoEntityList.size(); i++){
            TodoEntity todoEntity = todoEntityList.get(i);
            TodoResponseDto todoResponseDto = new TodoResponseDto();
            todoResponseDto.setId(todoEntity.getId());
            todoResponseDto.setTitle(todoEntity.getTitle());
            todoResponseDto.setDescription(todoEntity.getDescription());
            todoResponseDto.setCreatedAt(todoEntity.getCreatedAt());
            todoResponseDto.setUpdatedAt(todoEntity.getUpdatedAt());
            todoResponseDtoList.add(todoResponseDto);
        }
        return todoResponseDtoList;
    }

    public String deleteTodoById(Integer id){
        todoRepository.deleteById(id);
        return "Successfully deleted";
    }

    public String updateTodoByID(Integer id, TodoRequestDto todoRequestDto){
        Optional<TodoEntity> todoEntityOptional = todoRepository.findById(id);
        TodoEntity todoEntity = todoEntityOptional.get();
        todoEntity.setTitle(todoRequestDto.getTitle());
        todoEntity.setDescription(todoRequestDto.getDescription());
        todoRepository.save(todoEntity);
        return "Success";
    }

}
