package com.example.book.book;

import jakarta.persistence.Lob;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookResponse {
    private Integer id;
    private String title;
    private String author_name;
    private String isbn;
    private String synopsis;
    private String owner;
    private String bookCover;
    private double rate;
    private boolean archived;
    private boolean shareable;
}
