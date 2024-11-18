package com.example.book.book;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BorrowedBookResponse {
    private Integer id;
    private String title;
    private String author_name;
    private String isbn;
    private double rate;
    private boolean returned;
    private boolean returnApproved;
}
