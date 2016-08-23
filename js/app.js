var list_profile = [
				     {
				       "title": "General",
					   "icon": "img/ico_1_1.jpg",
					   "content": "<b>Full Name:</b> Mengxun Huang<br/><b>Nationality:</b> Chinese<br/><b>Gender:</b> Male<br/><b>Age:</b> 28<br/><b>Education:</b> Bachelor Degree<br/><b>Occupation:</b> Freelancer"
				     },
					 {
				       "title": "Experience",
					   "icon": "img/ico_1_2.jpg",
					   "content": "<b>Education Background:</b><br/>Bachelor Degree of Faculty of Science and Technology<br/>Assumption University, Bangkok, Thailand<br/>2008 - 2012<br/><b>Travelled Place:</b><br/>China, Japan, Qatar, Germany, Netherlands, Belgium, France, Switzerland, Austria, Italy, Thailand, Myanmar, Laos, Cambodia, Vietnam......<br/>"
				     },
					 {
				       "title": "Skill",
					   "icon": "img/ico_1_3.jpg",
					   "content": "<b>Language:</b><br/>Chinese(Native Language), English(Well Conversation Level), Thai(A Little Bit)<br/><b>Knowledge:</b><br/>C++, Python, HTML, CSS, Javascript, Bootstrap, JQuery, AJAX, PHP, MySQL, Calculus, Algorithm......<br/><b>Hobby:</b><br/>Travelling, Photographing, Hiking, Cycling, Reading Book, Creative Writing, Cooking, Diving......"
				     },
					 {
				       "title": "Contact",
					   "icon": "img/ico_1_4.jpg",
					   "content": "<b>Phone:</b> (+86)17301043351<br/><b>Hotmail:</b> harry_ctu@hotmail.com<br/><b>Gmail:</b> harry4769@gmail.com<br/><b>Wechat:</b> harrymengxun<br/><b>Address:</b> Nanshan District, Shenzhen, Guangdong, China"
				     }
				   ];

var post=document.getElementById("post");

function show_profile()
	  {
	      var n=list_profile.length;
		  post.innerHTML="";
		  for(var i=0;i<n;i++)
		  {
		      post.innerHTML+="<div class='container starter-template'><div class='main-post'><h2><b>"+list_profile[i].title
		                     +"</b></h2><div class='row'><div class='col-md-4' style='text-align:center;padding-bottom:20px'><img src='"
						     +list_profile[i].icon+"' alt='"+list_profile[i].title+"' width='160' height='120'/></div><div class='col-md-8' style='padding-left:10%;padding-right:10%'>"
						     +list_profile[i].content+"</div></div></div></div>";
		  }
	  }
	  
show_profile();
