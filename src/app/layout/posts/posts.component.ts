import { Component, OnInit } from '@angular/core';
import { Articles } from 'src/app/interfaces/articles';
import { PostService } from 'src/app/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  articlesData: Articles = {
    articles: [],
  };

  constructor(private post: PostService) {}

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles() {
    this.post.getArticles().subscribe((s) => {
      this.articlesData = s;
    });
  }
}
