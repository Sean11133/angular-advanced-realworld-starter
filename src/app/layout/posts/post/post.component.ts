import { PostService } from './../../../post.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/article';

@Component({
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  article?: Article;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private post: PostService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.getPost(params.get('id') || '');
    });
  }

  getPost(id: string) {
    this.post.getArticle(id).subscribe((s) => {
      this.article = s.article;
    });
  }
}
