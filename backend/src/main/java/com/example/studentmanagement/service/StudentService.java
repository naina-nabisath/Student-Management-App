
package com.example.studentmanagement.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.studentmanagement.entity.Student;
import com.example.studentmanagement.repository.StudentRepository;

@Service
public class StudentService {

    private final StudentRepository repository;


    public Student getStudentById(Long id) {
        return repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Student not found"));
    }


    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    public List<Student> getAllStudents() {
        return repository.findAll();
    }

    public Student addStudent(Student student) {
        return repository.save(student);
    }

    public Student updateStudent(Long id, Student student) {
        Student existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        existing.setName(student.getName());
        existing.setEmail(student.getEmail());
        existing.setPhone(student.getPhone());
        existing.setCourse(student.getCourse());
        existing.setDepartment(student.getDepartment());

        return repository.save(existing);
    }

    public void deleteStudent(Long id) {
        repository.deleteById(id);
    }

    public long countStudents() {
        return repository.count();
    }
}
