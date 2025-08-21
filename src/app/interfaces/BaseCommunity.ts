export interface BaseCommunity {

id:string,
  user_details : [{
    name:string,
    user_profile:[{
      user_id: string,
      country:string,
      city:string,
      gender_group:string,
      age_group:string,
      ethnicity_group:string,
      bio:string,
      profile_img:string,
    }]
  }]
}
