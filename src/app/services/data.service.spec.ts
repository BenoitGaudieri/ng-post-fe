import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService],
    });

    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve posts from the API via GET', () => {
    service.getPosts().subscribe((posts) => {
      posts.forEach((post) => {
        expect('id' in post).toBe(true);
        expect('title' in post).toBe(true);
        expect('body' in post).toBe(true);
        expect('userId' in post).toBe(true);
      });
    });

    const request = httpMock.expectOne(service['postsUrl']);
    expect(request.request.method).toBe('GET');
    request.flush([]);
  });

  it('should retrieve users from the API via GET', () => {
    service.getUsers().subscribe((users) => {
      users.forEach((user) => {
        expect('id' in user).toBe(true);
        expect('name' in user).toBe(true);
        expect('username' in user).toBe(true);
        expect('email' in user).toBe(true);
      });
    });

    const request = httpMock.expectOne(service['usersUrl']);
    expect(request.request.method).toBe('GET');
    request.flush([]);
  });
});
