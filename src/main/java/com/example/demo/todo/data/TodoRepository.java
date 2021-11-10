package com.example.demo.todo.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoRepository extends JpaRepository <TodoEntity, Integer>{
}
