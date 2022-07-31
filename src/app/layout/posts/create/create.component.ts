import { PostService } from './../../../post.service';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CreateArticle } from 'src/app/interfaces/create-article';

export type Unpacked<T> = T extends Array<infer U> ? U : T;

export type ToForm<OriginalType> = {
  [key in keyof OriginalType]: OriginalType[key] extends Array<any>
    ? FormArray<
        Unpacked<OriginalType[key]> extends object
          ? FormGroup<ToForm<Unpacked<OriginalType[key]>>>
          : FormControl<Unpacked<OriginalType[key]> | null>
      >
    : OriginalType[key] extends object
    ? FormGroup<ToForm<OriginalType[key]>>
    : FormControl<OriginalType[key] | null>;
};

type CreateArticleForm = ToForm<CreateArticle>;

@Component({
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  form = new FormGroup<CreateArticleForm>({
    title: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'blur',
    }),
    description: new FormControl(''),
    body: new FormControl('', {
      validators: [Validators.required, Validators.minLength(10)],
    }),
    tagList: new FormArray([
      new FormControl('programming'),
      new FormControl('javascript'),
    ]),
  });

  form1 = this.formBuilder.group({
    title: this.formBuilder.control(''),
    description: this.formBuilder.control(''),
    body: this.formBuilder.control(''),
    tagList: this.formBuilder.array([
      this.formBuilder.control('HTML'),
      this.formBuilder.control('CSS'),
      this.formBuilder.control('Javascript'),
    ]),
  });

  constructor(
    private postService: PostService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form);
      // this.postService.createArticle()
    }
  }

  addTag(tag: string) {
    this.form.controls.tagList.controls.push(this.formBuilder.control(tag));
  }

  removeTag(index: number) {
    this.form.controls.tagList.removeAt(index);
  }
}
