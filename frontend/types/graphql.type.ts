export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Mutation = {
  __typename?: 'Mutation',
  _empty?: Maybe<Scalars['String']>,
  createPost?: Maybe<Post>,
  updatePost?: Maybe<Post>,
  deletePost?: Maybe<Scalars['Boolean']>,
  signUpToGetToken?: Maybe<Scalars['String']>,
  signInToGetToken?: Maybe<Scalars['String']>,
};


export type MutationCreatePostArgs = {
  input?: Maybe<PostInput>
};


export type MutationUpdatePostArgs = {
  id: Scalars['ID'],
  input?: Maybe<PostInput>
};


export type MutationDeletePostArgs = {
  id: Scalars['ID']
};


export type MutationSignUpToGetTokenArgs = {
  input?: Maybe<UserInput>
};


export type MutationSignInToGetTokenArgs = {
  input?: Maybe<UserInput>
};

export type Post = {
  __typename?: 'Post',
  id: Scalars['ID'],
  title?: Maybe<Scalars['String']>,
  content?: Maybe<Scalars['String']>,
  author?: Maybe<User>,
};

export type PostInput = {
  title: Scalars['String'],
  content?: Maybe<Scalars['String']>,
};

export type Query = {
  __typename?: 'Query',
  post?: Maybe<Post>,
  posts?: Maybe<Array<Maybe<Post>>>,
  _empty?: Maybe<Scalars['String']>,
  user?: Maybe<User>,
};


export type QueryPostArgs = {
  id: Scalars['ID']
};


export type QueryPostsArgs = {
  take?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>
};


export type QueryUserArgs = {
  id: Scalars['ID']
};

export type User = {
  __typename?: 'User',
  id: Scalars['ID'],
  username?: Maybe<Scalars['String']>,
  posts?: Maybe<Array<Maybe<Post>>>,
};


export type UserPostsArgs = {
  take?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>
};

export type UserInput = {
  username: Scalars['String'],
  password: Scalars['String'],
};
