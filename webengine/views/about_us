<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
<link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'>

<div class="image-aboutus-banner w-100" style="background: url({{this.header_img.getImage()}});">
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<h1 class="lg-text">{{this.header_title}}</h1>
				<p class="image-aboutus-para text-white">{{this.header_desc}}</p>
			</div>
		</div>
	</div>
</div>

<div class="bread-bar">
	<div class="container">
		<div class="row">
			<div class="col-md-8 col-sm-6 col-xs-8">
				<ol class="breadcrumb">
					<li>{{this.header_title}}</li>
					<li class="active">{{clippings.site_name}}</li>
				</ol>
			</div>
			<div class="col-md-4 col-sm-6 col-xs-4">
			</div>
		</div>
	</div>
</div>

<div class="aboutus-secktion paddingTB60" style="background: url('{{this.bg_img.getImage()}}');">
    <div class="container">
        <div class="row">
			<div class="col-md-6">
				<h1 class="strong">{{this.article_title_l}}</h1>
				<p class="lead">{{this.article_caption_l}}</p>
			</div>
			<div class="col-md-6">
				<h1 class="strong">{{this.article_title_r}}</h1>
				<p class="lead">{{this.article_caption_r}}</p>
			</div>
		</div>
    </div>

	<div class="container team-sektion paddingTB60">
		<div class="row">
			<div class="site-heading text-center">
				<h3>{{this.client_header}}</h3>
				<p>{{this.client_desc}}</p>
				<div class="border"></div>
			</div>
		</div>

		<div class="row">
			{{each about_clients as clients sort_by sort_order ASC}}
			<div class="col-md-4 team-box">
				<div class="team-img thumbnail">
					<img src="{{clients.client_img.getImage(500,600)}}">
					<div class="team-content">    
						<h3>{{clients.client_name}}</h3>
						<div class="border-team"></div>
						<h5>{{clients.client_haircut}}</h5>
						<div class="border-team"></div>
						<p>{{clients.client_desc}}</p>
						<div class="social-icons"> 
							<a href="https://www.facebook.com/"><i id="social-fb" class="fa fa-facebook-square fa-3x social"></i></a>
							<a href="https://twitter.com/"><i id="social-tw" class="fa fa-twitter-square fa-3x social"></i></a>
							<a href="https://plus.google.com/"><i id="social-gp" class="fa fa-google-plus-square fa-3x social"></i></a>
							<a href="mailto:bootsnipp@gmail.com"><i id="social-em" class="fa fa-envelope-square fa-3x social"></i></a>
						</div>
					</div>
				</div>
			</div>
			{{end-each}}
		</div>
	</div>
</div>

<div class="cta-sektion cta-padding35">
    <div class="container">
        <div class="row">
            <div class="col-md-9 col-sm-9 col-xs-12">
                <h3><span class="glyphicon glyphicon-cog "></span>{{this.advertisement}}</h3>
            </div>
            <div class="col-md-3 col-sm-3 col-xs-12 Tpadding10">
                <button type="button" class="btn btn-primary site-btn">{{this.button_name}}</button>
            </div>
        </div>
    </div>
</div>
