package com.example.demo.todo.controller;

import com.example.demo.todo.data.TodoEntity;
import com.example.demo.todo.data.TodoRepository;
import com.example.demo.todo.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/todo")
public class TodoController {

    /*@GetMapping("/todoGet")
    public String test(String name, int age) {
        return "Hello World "+name+"  "+age;
    }*/
    /*@PostMapping(value = "/testPost")
    public List<Test> testPost(@RequestBody List<Test> test)
    {
        return test;
    }*/
    @Autowired
    TodoService todoService;

    @PostMapping(value = "/new")
    public int createNewTodo(@RequestBody TodoRequestDto todoRequestDto){
        return todoService.createTodo(todoRequestDto);
    }
    @GetMapping(value = "/get")
    public TodoResponseDto getTodo(Integer id)
    {
        TodoResponseDto todoResponseDto = todoService.getTodo(id);
        return todoResponseDto;
    }
    @GetMapping(value = "/findAll/get")
    public List<TodoResponseDto> getTodos(){
        return todoService.getTodos();
    }

    @DeleteMapping(value = "/delete")
    public String deleteTodo(Integer id){
        return todoService.deleteTodoById(id);
    }
    @PutMapping(value = "/update")
    public String updateTodo(Integer id, @RequestBody TodoRequestDto todoRequestDtoDto){
        return todoService.updateTodoByID(id,todoRequestDtoDto);
    }

}
