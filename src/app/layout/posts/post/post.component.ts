import { PostService } from './../../../post.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/article';

@Component({
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  id: string | null = '';
  article: Article = {
    id: '',
    title: '',
    description: '',
    body: '',
    tagList: [],
    createdAt: '',
    updatedAt: '',
    author: '',
  };
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private post: PostService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');

      this.getPost(this.id);
    });
  }

  getPost(id: string | null) {
    this.post.getArticle(id || '').subscribe((s) => {
      this.article = s.article;
      console.log(s);
    });
  }
}
