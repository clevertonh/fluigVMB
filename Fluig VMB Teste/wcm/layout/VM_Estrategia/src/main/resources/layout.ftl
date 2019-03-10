<#import "/wcm.ftl" as wcm/>
<!-- header di Fluig -->
<@wcm.header authenticated="true"/>
<!-- WCM Wrapper content -->
<div class="wcm-wrapper-content">

<!-- menu do Fluig -->
    <@wcm.menu />

    <!-- Wrapper -->
    <div class="wcm-all-content">
        <div id="wcm-content" class="clearfix wcm-background">

            <!-- Your content here -->
			
	<body>
		<div class="fluig-style-guide">
				<nav class="navbar navbar-default" role="navigation">
    <div class="container">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <a class="navbar-brand" href="#">Home</a>
        </div>
        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
                <li class="active"><a href="#">Meta</a></li>
                <li><a href="#">Objetivos</a></li>
				<li><a href="#">Indicadores</a></li>
				<li><a href="#">Projetos</a></li>
            </ul>
        </div>
        <!-- /.navbar-collapse -->
    </div>
    <!-- /.container -->
</nav>	
				</div>			
				
	</div>
</body>



			<!-- rodape do Fluig -->
            <@wcm.footer layoutuserlabel="wcm.layoutdefault.user" />
        </div>
    </div>
</div>
		